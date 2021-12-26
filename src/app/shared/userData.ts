import { GameDetail } from './GameDetail';

export class userData{
    id: number;
    username: string;
    gameDetails: GameDetail;
    orderRoad: number[];
    orderRail: number[];
    inventoryItems: number[];
    inventoryCost: number[];
    backlogItems: number[];
    backlogCost: number[];
    demumurageItems: number[];
    demmurageCosts: number[];
    transportationCosts: number[];
    totalCosts: number[]
    totalCost: number;
    professor:string;
}