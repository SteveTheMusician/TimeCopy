// replace all wanted Letters in a String but let the last one be

export function replaceAllTokensBetween(string, token) {
    let parts = string.split(token);
    if (parts[1]===undefined) {
        return string;
    }
    else {
        return parts.slice(0,-1).join('') + token + parts.slice(-1)
    }
}