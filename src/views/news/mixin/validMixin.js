import { validTypes, validFunction } from "@/utils/validate";
export const validMixinNews = {
    data() {

        return {
            newsRule: {
                title: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: validFunction('Sarlavha', validTypes.string)
                    }
                ],
                description: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: validFunction('Tavsif', validTypes.string)
                    }
                ]
            }
        }
    }
}