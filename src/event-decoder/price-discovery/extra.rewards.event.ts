import {
    BigUIntType,
    FieldDefinition,
    StructType,
    TokenIdentifierType,
} from '@elrondnetwork/erdjs/out';
import { GenericToken } from '../../generic.token';
import { PriceDiscoveryEvent } from './price.discovery.event';
import { ExtraRewardsEventType } from './price.discovery.types';

export class ExtraRewardsEvent extends PriceDiscoveryEvent {
    rewardsToken: GenericToken | undefined;

    constructor(init?: Partial<PriceDiscoveryEvent>) {
        super(init);
        const decodedEvent = this.decodeEvent();
        this.rewardsToken = new GenericToken({
            tokenID: decodedEvent.rewardsTokenID.toString(),
            amount: decodedEvent.RewardsAmount,
        });
    }

    toJSON(): ExtraRewardsEventType {
        return {
            ...super.toJSON(),
            rewardsToken: this.rewardsToken?.toJSON(),
        };
    }

    protected getStructure(): StructType {
        return new StructType('ExtraRewardsEvent', [
            new FieldDefinition(
                'rewardsTokenID',
                '',
                new TokenIdentifierType(),
            ),
            new FieldDefinition('RewardsAmount', '', new BigUIntType()),
        ]);
    }
}
