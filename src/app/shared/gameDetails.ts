import { GameDetail } from './GameDetail';

export const GameDetails: GameDetail =  {
        id: "0",
        professor:"",
        invCostFactor: 0.5,
        backlogCostFactor: 1,
        demmurageCostFactor: 0.25,
        weeksTotal: 10,
        storageTotal: 5000,
        stockInitial: 2000,
        truckLeadTime: 3,
        trainLeadTime: 4,
        trainFreightRate: 2,
        truckFreightRate: 3,
        wpcs: [
            {
                week: 1,
                price: 33500,
                cDemand: 1500
            },
            {
                week: 2,
                price: 35000,
                cDemand: 300
            },
            {
                week: 3,
                price: 37000,
                cDemand: 0
            },
            {
                week: 4,
                price: 38000,
                cDemand: 0
            },
            {
                week: 5,
                price: 36500,
                cDemand: 1000
            },
            {
                week: 6,
                price: 34000,
                cDemand: 2000
            },
            
            {
                week: 7,
                price: 32000,
                cDemand: 3000
            },
            
            {
                week: 8,
                price: 33000,
                cDemand: 500
            },
            
            {
                week: 9,
                price: 37000,
                cDemand: 100
            },
            
            {
                week: 10,
                price: 35000,
                cDemand: 900
            },
        ],
}
