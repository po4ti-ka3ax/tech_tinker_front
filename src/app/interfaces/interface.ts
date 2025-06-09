export interface FiltersProps {
    componentName: string,
    NameVendor:NameVendor[],
    NameModel:NameModel[],
    ProcessorSocket?:ProcessorSocket[],
    VideoMemoryType?:VideoMemoryType[],
    VideoMemoryVolume?:VideoMemoryVolume[],
}

export interface ConfigureInterface {
    nameComponent: string,
    linkName: string,
}
export interface CommentInterface {
    userData: object,
    image: string,
    commentText: string,
    
}

export interface LongCharacteristicInterface {
    brandComponent:string, 
    nameComponent:string, 
    modelComponent:string,
    price:number
    
}
export interface ShortCharacteristicInterface {
    brandComponent:string, 
    nameComponent:string, 
    modelComponent:string
}

export interface LinkComponentInterface {
    path: string,
    namePath: string
}

export interface ComponentInnerInterface {
    componentKeys:[], 
    componentValues:[], 
    name:string, 
    editOpen:boolean, 
    setEditOpen:() => void, 
    deleteOpen:boolean, 
    setDeleteOpen:() => void, 
    addOpen:boolean, 
    setAddOpen:() => void
}

export interface ProfilePageProps {
  params: { id: number };
}

export interface ComputerCardInterface {
    computerId:number
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