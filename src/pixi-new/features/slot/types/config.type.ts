export type PrizeType = {
    id: number;
    name: string;
    prizeTypeId: number;
    currencyId: number;
    value: number;
    roundId: number | null;
    index: number;
    parentId: null;
    isParent: boolean;
    multipliable: boolean;
}