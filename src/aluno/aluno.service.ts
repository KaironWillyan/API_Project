import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';
import { AlunoDTO } from './aluno.dto';

@Injectable()
export class AlunoService {
    constructor(private prisma: PrismaService){}

    async create(data: AlunoDTO){
        
        const alunoExists = await this.prisma.aluno.findFirst({
            where: {
                id: data.id
            }
        })

        if(alunoExists){
            throw new Error('Aluno already exists');
        }

        const aluno = await this.prisma.aluno.create({
            data,
        })

        return aluno;
    }
}
