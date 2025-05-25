export interface FiltersProps {
    componentName: string,
    NameVendor:NameVendor[],
    NameModel:NameModel[],
    ProcessorSocket?:ProcessorSocket[],
    VideoMemoryType?:VideoMemoryType[],
    VideoMemoryVolume?:VideoMemoryVolume[],
}

export interface CheckboxInterface {
    componentName: string,
    componentId:number,
    componentLabel:string
    
}

export interface PartInterface {
  title: string;
  componentArray: { id: number; name: string }[];
  showBtn: boolean;
  setShowBtn: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface LinkInterface {
    textLink: string,
    path: string
}

export interface FilterState {
    selectedFilters: {
        [key: string]: number[]
    };
    toggleFilter: (category: string, id: number) => void;
    clearAllFilters: () => void
}

interface NameVendor {
    id: number,
    name: string
}
interface NameModel {
    id: number,
    name: string
}
interface ProcessorSocket {
    id: number,
    name: string
}
interface VideoMemoryType {
    id: number,
    name: string
}
interface VideoMemoryVolume {
    id: number,
    name: string
}