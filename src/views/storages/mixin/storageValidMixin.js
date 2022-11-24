import { validFile, validFunction, validTypes } from "@/utils/validate"

export const storageValidMixin = {
    data() {
        return {
            storageRules: {
                region_id: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: validFunction('viloyat', validTypes.number)
                    }
                ],
                district_id: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: validFunction('Tuman', validTypes.number)
                    }
                ],
                name: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: validFunction('Nomi', validTypes.string)
                    }
                ],
                sort_order: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: validFunction('', validTypes.number)
                    }
                ],
                call_center: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: validFunction('Chaqiruv markazi', validTypes.string)
                    }
                ],
                is_can_accept_parcels: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: validFunction('', validTypes.number)
                    }
                ],
                service_fee_percent: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: validFunction('Xizmat haqqi', validTypes.number)
                    }
                ],
                logo: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: validFile('rasm')
                    }
                ]
            }
        }
    }
} 