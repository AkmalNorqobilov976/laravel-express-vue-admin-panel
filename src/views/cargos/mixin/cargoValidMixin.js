import { validFunction, validTypes } from "@/utils/validate"

export const cargoValidMixin = {
    data() {
        return {
            cargoRule: {
                from_region_id:[
                    {
                        required: true,
                        trigger: 'blur',
                        validator: validFunction('Qaysi viloyatdan', validTypes.number)
                    }
                ],
                from_district_id:[
                    {
                        required: true,
                        trigger: 'blur',
                        validator: validFunction('Qaysi tumandan', validTypes.number)
                    }
                ],
                from_address:[
                    {
                        required: true,
                        trigger: 'blur',
                        validator: validFunction('Qaysi manzilga', validTypes.number)
                    }
                ],
                to_region_id:[
                    {
                        required: true,
                        trigger: 'blur',
                        validator: validFunction('Qaysi viloyatga', validTypes.number)
                    }
                ],
                to_district_id:[
                    {
                        required: true,
                        trigger: 'blur',
                        validator: validFunction('Qaysi tumanga', validTypes.number)
                    }
                ],
                creator_id:[
                    {
                        required: true,
                        trigger: 'blur',
                        validator: validFunction('Admin', validTypes.number)
                    }
                ],
                matter:[
                    {
                        required: true,
                        trigger: 'blur',
                        validator: validFunction('Muammo', validTypes.number)
                    }
                ]
            }
        }
    }
}