export const formerMultipleFile = (object) => {
    const formData = new FormData();
    for (const key in object) {
        if (typeof object[key] === "object") {
            for (const file in object[key]) {
                formData.append(`${key}[]`, object[key][file]);
            }
            continue;
        }
        if (typeof object[key] === "boolean") {
            let bool = object[key] ? 1 : 0;
            formData.append(`${key}`, bool);
            continue;
        }
        formData.append(`${key}`, object[key]);
    }
    return formData;
}

export const formerSingleFile =  (object) => {
    const formData = new FormData();
    for (const key in object) {
        if (typeof object[key] === "boolean") {
            let bool = object[key] ? 1 : 0;
            formData.append(`${key}`, bool);
            continue;
        }
        formData.append(`${key}`, object[key]);
    }
    return formData;
}