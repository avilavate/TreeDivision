export interface IVisibilityMap {
    Position: IPosition;
    NoOfProfiles: number;
}

export interface IPosition {
    quadrant: number,
    level: number
};

export interface IZoomView { partition: Array<number>, zoomLevel: number }

export interface IZoomViewPartitions { partitions: Array<number> };

