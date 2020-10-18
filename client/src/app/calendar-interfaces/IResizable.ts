export interface IResizable {
    setResizable(): void;
    removeResizable(): void;
    onResize(e): number;
}