import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const rootDirectory = fileURLToPath(new URL("../", import.meta.url));
const feedUrl = "https://rookieops.dev/rss.xml";
const jsonPath = path.join(rootDirectory, "assets", "data", "posts.json");
const pages = [
    {
        path: path.join(rootDirectory, "index.html"),
        locale: "pt-BR",
        linkLabel: "Ler artigo",
        assetPrefix: "assets"
    },
    {
        path: path.join(rootDirectory, "en", "index.html"),
        locale: "en-US",
        linkLabel: "Read article",
        assetPrefix: "../assets"
    }
];

function unwrapCdata(value = "") {
    return value
        .replace(/^\s*<!\[CDATA\[/i, "")
        .replace(/\]\]>\s*$/i, "")
        .trim();
}

function decodeEntities(value = "") {
    const namedEntities = {
        amp: "&",
        apos: "'",
        gt: ">",
        lt: "<",
        nbsp: " ",
        quot: "\""
    };

    return value
        .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
        .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number.parseInt(code, 10)))
        .replace(/&([a-z]+);/gi, (entity, name) => namedEntities[name.toLowerCase()] ?? entity);
}

function stripHtml(value = "") {
    return decodeEntities(unwrapCdata(value))
        .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
        .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
        .replace(/<br\s*\/?>/gi, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function extractTag(block, tagName) {
    const escapedTag = tagName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const match = block.match(new RegExp(`<${escapedTag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escapedTag}>`, "i"));
    return match ? unwrapCdata(match[1]) : "";
}

function extractLink(block) {
    const rssLink = stripHtml(extractTag(block, "link"));
    if (rssLink) return rssLink;

    const atomLink = block.match(/<link\b[^>]*href=["']([^"']+)["'][^>]*>/i);
    return atomLink ? decodeEntities(atomLink[1]) : "";
}

function truncate(value, maximumLength = 180) {
    if (value.length <= maximumLength) return value;
    return `${value.slice(0, maximumLength).replace(/\s+\S*$/, "")}…`;
}

function parseFeed(xml) {
    const rssItems = xml.match(/<item\b[\s\S]*?<\/item>/gi);
    const atomEntries = xml.match(/<entry\b[\s\S]*?<\/entry>/gi);
    const entries = rssItems ?? atomEntries ?? [];

    return entries
        .map((entry) => {
            const title = stripHtml(extractTag(entry, "title"));
            const link = extractLink(entry);
            const publishedValue =
                stripHtml(extractTag(entry, "pubDate")) ||
                stripHtml(extractTag(entry, "published")) ||
                stripHtml(extractTag(entry, "updated"));
            const descriptionValue =
                extractTag(entry, "description") ||
                extractTag(entry, "content:encoded") ||
                extractTag(entry, "summary") ||
                extractTag(entry, "content");
            const parsedDate = new Date(publishedValue);

            if (!title || !link || Number.isNaN(parsedDate.getTime())) return null;

            return {
                title,
                link,
                publishedAt: parsedDate.toISOString(),
                description: truncate(stripHtml(descriptionValue) || "Leia o artigo completo no RookieOps.")
            };
        })
        .filter(Boolean)
        .sort((left, right) => right.publishedAt.localeCompare(left.publishedAt))
        .slice(0, 6);
}

function escapeHtml(value) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll("\"", "&quot;")
        .replaceAll("'", "&#039;");
}

function formatPostCard(post, locale, linkLabel, assetPrefix) {
    const formattedDate = new Intl.DateTimeFormat(locale, {
        day: "2-digit",
        month: "short",
        year: "numeric",
        timeZone: "UTC"
    }).format(new Date(post.publishedAt));

    return [
        "                    <article class=\"post-card\">",
        "                        <div>",
        `                            <p class="post-date">${escapeHtml(formattedDate)}</p>`,
        `                            <h3 class="post-title">${escapeHtml(post.title)}</h3>`,
        `                            <p class="post-desc">${escapeHtml(post.description)}</p>`,
        "                        </div>",
        `                        <a href="${escapeHtml(post.link)}" class="post-link" target="_blank" rel="noopener noreferrer">`,
        `                            ${escapeHtml(linkLabel)}`,
        `                            <img src="${assetPrefix}/vendor/boxicons/bx-right-arrow-alt.svg" alt="" width="20" height="20" aria-hidden="true">`,
        "                        </a>",
        "                    </article>"
    ].join("\n");
}

async function updatePage(page, posts) {
    const html = await readFile(page.path, "utf8");
    const cards = posts
        .map((post) => formatPostCard(post, page.locale, page.linkLabel, page.assetPrefix))
        .join("\n");
    const replacement = [
        "                    <!-- POSTS_START -->",
        cards,
        "                    <!-- POSTS_END -->"
    ].join("\n");
    const updatedHtml = html.replace(
        /\s*<!-- POSTS_START -->[\s\S]*?<!-- POSTS_END -->/,
        `\n${replacement}`
    );

    if (updatedHtml === html) {
        throw new Error(`Post markers were not found in ${page.path}`);
    }

    await writeFile(page.path, updatedHtml, "utf8");
}

async function main() {
    const response = await fetch(feedUrl, {
        headers: {
            "User-Agent": "tkusal.com.br static feed updater"
        },
        signal: AbortSignal.timeout(20_000)
    });

    if (!response.ok) {
        throw new Error(`Feed request failed with HTTP ${response.status}`);
    }

    const posts = parseFeed(await response.text());
    if (posts.length === 0) {
        throw new Error("The feed did not contain valid posts.");
    }

    let existingPosts = [];
    try {
        const existingData = JSON.parse(await readFile(jsonPath, "utf8"));
        existingPosts = existingData.posts ?? [];
    } catch {
        existingPosts = [];
    }

    if (JSON.stringify(existingPosts) === JSON.stringify(posts)) {
        console.log("RookieOps posts are already up to date.");
        return;
    }

    for (const page of pages) {
        await updatePage(page, posts);
    }

    const json = {
        source: feedUrl,
        updatedAt: new Date().toISOString(),
        posts
    };
    await writeFile(jsonPath, `${JSON.stringify(json, null, 2)}\n`, "utf8");
    console.log(`Updated ${posts.length} RookieOps posts.`);
}

main().catch((error) => {
    console.warn(`RookieOps update skipped: ${error.message}`);
});
