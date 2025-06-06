export function bodkaBodkaText(text, maxLength = 10) {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}