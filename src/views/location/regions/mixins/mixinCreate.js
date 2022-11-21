export const mixinCreate = {
    data: () => {
        const validTypes = {
            string: 'string',
            number: 'number'
        }
        const types = {
            string: "harflardan",
            number: "sonlardan"
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
            createRegionRules: {
                name: [{
                    required: true,
                    trigger: 'blur',
                    validator: validName('Nom maydoni', "string")
                }],
                code: [{
                    required: true,
                    trigger: 'blur',
                    validator: validName('Kod maydoni', "string")
                }],
                is_pinned: [{
                    required: true,
                    trigger: 'blur',
                    validator: validName('Pin qilinganmi maydoni', 'number')
                }],
                calling_code: [{
                    required: true,
                    trigger: 'blur',
                    validator: validName('Chaqiruv kodi maydoni', "string")
                }],
                delivery_amount: [{
                    required: true,
                    trigger: 'blur',
                    validator: validName('Yetkazib berish miqdori maydoni ', 'number')
                }],
                delivery_timer_in_hours: [{
                    required: true,
                    trigger: 'blur',
                    validator: validName('Yetkazib berish vaqti maydoni', 'number')
                }],
            },
            createDistrictRules: {
                country_id: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: validName('Viloyat nomi', validTypes.string)
                    }
                ],
                is_enabled: [
                    {
                        required: true,
                        trigger: 'blur'
                    }
                ],
                name: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: validName('Tuman nomi', validTypes.string)
                    }
                ],
                code: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: validName('Tuman kodi', validTypes.string)
                    }
                ],
                delivery_amount: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: validName('Yetkazib berishlar miqdori', validTypes.number)
                    }
                ],
                delivery_timer_in_hours: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: validName('Yetkazib berishlar miqdori', validTypes.number)
                    }
                ],
            }
        }
    }
}