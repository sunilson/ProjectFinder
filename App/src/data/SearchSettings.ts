import { Location } from './Location';
import { Tag } from './Tag';
export class SearchSettings {
    public global: Boolean;
    public tags: Tag[];
    public location: Location;
    public query: string;
    public paid: boolean;
}