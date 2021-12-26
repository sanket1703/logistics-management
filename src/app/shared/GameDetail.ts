import { WPC } from './wpc';

export class GameDetail{
    id: string;
    storageTotal: number;
    stockInitial: number;
    weeksTotal: number;
    invCostFactor: number;
    backlogCostFactor: number;
    demmurageCostFactor: number;
    truckLeadTime: number;
    trainLeadTime: number;
    truckFreightRate: number;
    trainFreightRate: number;
    professor:string;
    wpcs: WPC[];
}