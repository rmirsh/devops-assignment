export const formatPhone = (value: string) => {
    if (!value) return value;

    let phoneNumber = value.replace(/[^\d+]/g, '');
    const phoneNumberLength = phoneNumber.length;

    if (phoneNumberLength === 1 && phoneNumber !== "+") phoneNumber = `+7 ${phoneNumber}`;

    if (phoneNumberLength < 6) return `${phoneNumber.slice(0, 2)} (${phoneNumber.slice(2)})`;

    if (phoneNumberLength < 8) return `${phoneNumber.slice(0, 2)} (${phoneNumber.slice(2, 5)})-${phoneNumber.slice(5)}`;

    if (phoneNumberLength < 10) return `${phoneNumber.slice(0, 2)} (${phoneNumber.slice(2, 5)})-${phoneNumber.slice(5, 8)}-${phoneNumber.slice(8)}`

    return `${phoneNumber.slice(0, 2)} (${phoneNumber.slice(2, 5)})-${phoneNumber.slice(5, 8)}-${phoneNumber.slice(8, 10)}-${phoneNumber.slice(10, 12)}`;
};