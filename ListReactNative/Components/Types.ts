export interface ListItem {
    _id: string;
    title: string;
    mainText: string;
}
export interface TheListProps {
    data: ListItem[];
    setData: React.Dispatch<React.SetStateAction<ListItem[]>>;
}

