import { Request, Response } from "express"
import { RegisterGameUseCase } from './RegisterGameUseCase'
import { GameRepository } from "../../infra/repositories/GameRepository";
import { IGameDTO } from "../../infra/entities/game";

const factory = () => {
    const gameRepository = new GameRepository;
    const useCase = new RegisterGameUseCase(gameRepository);

    return useCase
}

class RegisterGameController { 

    constructor(private useCase: RegisterGameUseCase) {}

    async handler(req: Request, res: Response): Promise<Response> {
        const { releaseData, designer, developer, genre, mode, name, platform: platform }: IGameDTO = req.body
        
        await factory().execute({  releaseData, designer, developer, genre, mode, name, platform })

        return res.status(201).json({ message: 'Registro criado com sucesso!'})
    }
}

export { RegisterGameController }