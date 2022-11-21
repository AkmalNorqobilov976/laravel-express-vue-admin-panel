import { validFunction, validTypes } from "@/utils/validate"

export const validCabOrderMixin = {
    data() {
        return {
            cabOrderRule: {
                from_region_id: [{
                    required: true,
                    trigger: 'blur',
                    validator: validFunction('Qaysi Viloyatdan', validTypes.number)
                }],
                from_district_id: [{
                    required: true,
                    trigger: 'blur',
                    validator: validFunction('Qaysi tumandan', validTypes.number)
                }],
                from_address: [{
                    required: true,
                    trigger: 'blur',
                    validator: validFunction('Qaysi manzildan', validTypes.string)
                }],
                to_region_id: [{
                    required: true,
                    trigger: 'blur',
                    validator: validFunction('Qaysi Viloyatga', validTypes.number)
                }],
                to_district_id: [{
                    required: true,
                    trigger: 'blur',
                    validator: validFunction('Qaysi tumanga', validTypes.number)
                }],
                to_address: [{
                    required: true,
                    trigger: 'blur',
                    validator: validFunction('Qaysi manzilga', validTypes.string)
                }],
                seat_count: [{
                    required: true,
                    trigger: 'blur',
                    validator: validFunction('Seat Count', validTypes.number)
                }],
                driver_id: [{
                    required: true,
                    trigger: 'blur',
                    validator: validFunction('Haydovchi', validTypes.number)
                }],
                creator_id: [{
                    required: true,
                    trigger: 'blur',
                    validator: validFunction('Admin', validTypes.number)
                }],
                cost: [{
                    required: true,
                    trigger: 'blur',
                    validator: validFunction('Narxi', validTypes.number)
                }],
            }

        }
    }
}