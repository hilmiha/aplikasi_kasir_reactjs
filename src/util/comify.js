export function commify(n) {
    var parts = n.toString();
    const thousands = /\B(?=(\d{3})+(?!\d))/g;
    return parts.replace(thousands, ".");
}