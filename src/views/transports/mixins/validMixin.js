export const validMixinTransport = {
    data() {
        const validTypes = {
            string: 'string',
            number: 'number',
            boolean: 'boolean'
        }
        const types = {
            string: "harflardan",
            number: "sonlardan",
            boolean: "ha yoki yo'qdan"
        };
        const validName = (name, type) => {
            return (rule, value, callback) => {
                if (!value) {
                    callback(new Error(`${name} bo\'sh bo\'lmasligi kerak!!!`))
                } else {
                    callback()
                }

                if (typeof value === type) {
                    callback(new Error(`${name} ${types[type]} iborat bo\'lishi kerak!!!`))
                } else {
                    callback()
                }
            }
        }

        return {
            transportRules: {
                from_region_id: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: validName('Qaysi viloyatdan', validTypes.string)
                    }
                ],
                from_district_id: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: validName('Qaysi tumandan', validTypes.string)
                    }
                ],
                // from_address: [
                //     {
                //         required: true,
                //         trigger: 'blur',
                //         validator: validName('Qaysi manzildan', validTypes.string)
                //     }
                // ],
                to_region_id: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: validName('Qaysi viloyatga', validTypes.string)
                    }
                ],
                to_district_id: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: validName('Qaysi tumanga', validTypes.string)
                    }
                ],
               
                note: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: validName('Eslatma', validTypes.string)
                    }
                ],
                cost: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: validName('Narxi', validTypes.number)
                    }
                ],
                creator_id: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: validName('Admin ismi', validTypes.string)
                    }
                ],
            }
        }
    }
}