export interface Responsecomic {
    estado: number;
    comics: comic[]
}
export interface comic {
    id: number;
    nombre: string;
    descripcion: string;
    precio: string;
    imagen: string;
}

export interface ResponsecomicId {
    estado: number;
    comic: comic;
}

export interface ResponseStatuscomic {
    estado: number;
    mensaje: string;
}