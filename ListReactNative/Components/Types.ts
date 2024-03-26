export interface ListItem {
    id: string;
    title: string;
    mainText: string;
}
export interface TheListProps {
    data: ListItem[];
    setData: React.Dispatch<React.SetStateAction<ListItem[]>>;
}
export interface LoadingProps {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

