import { plainToInstance } from 'class-transformer';
import { CostumerResponseDto } from 'src/modules/costumers/dto/response-costumer.dto';
import { CostumerEntity } from 'src/modules/costumers/entities/costumer.entity';

export class CostumerPresenter {
    static toResponse(costumer: CostumerEntity): CostumerResponseDto {
        return plainToInstance(CostumerResponseDto, costumer, {
            excludeExtraneousValues: true,
        });
    }

    static toManyResponse(costumers: CostumerEntity[]): CostumerResponseDto[] {
        return plainToInstance(CostumerResponseDto, costumers, {
            excludeExtraneousValues: true,
        });
    }
}
