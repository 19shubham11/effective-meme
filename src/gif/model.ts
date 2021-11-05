export interface GIPHYResponse {
    data: GIPHYData
}

interface GIPHYData {
    type: string
    id: string
    title: string
    images: {
        original: {
            url: string
        }
    }
}
