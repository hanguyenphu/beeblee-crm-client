export default function(value) {
    const phoneRegex = /^\(?([0-9]{3})\)?[-.]?([0-9]{3})[-.]?([0-9]{4})$/;

    value = value.replace(phoneRegex, "($1)$2-$3");
    value = value.replace(" ", "");
    value = value.replace("+1", "");
    if (value.length > 9) {
        value = value.slice(0, 13);
    }
    return value;
}
