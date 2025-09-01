interface ParsedElement {
    type: 'header' | 'paragraph' | 'numbered-list';
    level?: number;
    content: string;
    items?: string[];
}

export class MarkdownParser {

    parseMarkdown(markdown: string): ParsedElement[] {
        const lines = markdown.split('\n').filter(line => line.trim() !== '');
        const elements: ParsedElement[] = [];

        let i = 0;
        while (i < lines.length) {
            const line = lines[i].trim();

            // Handle headers (# ## ### etc.)
            if (line.startsWith('#')) {
                const headerMatch = line.match(/^(#{1,6})\s+(.+)/);
                if (headerMatch) {
                    elements.push({
                        type: 'header',
                        level: headerMatch[1].length,
                        content: this.parseBold(headerMatch[2])
                    });
                }
                i++;
            }
            // Handle numbered lists (1. 2. 3. etc.)
            else if (/^\d+\.\s/.test(line)) {
                const listItems: string[] = [];

                // Collect all consecutive numbered items
                while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
                    const itemMatch = lines[i].trim().match(/^\d+\.\s+(.+)/);
                    if (itemMatch) {
                        listItems.push(this.parseBold(itemMatch[1]));
                    }
                    i++;
                }

                elements.push({
                    type: 'numbered-list',
                    content: '',
                    items: listItems
                });
            }
            // Handle regular paragraphs
            else {
                elements.push({
                    type: 'paragraph',
                    content: this.parseBold(line)
                });
                i++;
            }
        }

        return elements;
    }

    private parseBold(text: string): string {
        // Handle **bold** syntax
        return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/__(.*?)__/g, '<strong>$1</strong>');
    }

    toHtml(elements: ParsedElement[]): string {
        return elements.map(element => {
            switch (element.type) {
                case 'header':
                    return `<h${element.level}>${element.content}</h${element.level}>`;

                case 'numbered-list':
                    const listItems = element.items!
                        .map(item => `  <li>${item}</li>`)
                        .join('\n');
                    return `<ol>\n${listItems}\n</ol>`;

                case 'paragraph':
                    return `<p>${element.content}</p>`;

                default:
                    return '';
            }
        }).join('\n\n');
    }

    toPrettyText(elements: ParsedElement[]): string {
        return elements.map(element => {
            switch (element.type) {
                case 'header':
                    const prefix = '='.repeat(element.level!);
                    return `${prefix} ${element.content.replace(/<\/?strong>/g, '**')} ${prefix}`;

                case 'numbered-list':
                    return element.items!
                        .map((item, index) => `${index + 1}. ${item.replace(/<\/?strong>/g, '**')}`)
                        .join('\n');

                case 'paragraph':
                    return element.content.replace(/<\/?strong>/g, '**');

                default:
                    return '';
            }
        }).join('\n\n');
    }
}