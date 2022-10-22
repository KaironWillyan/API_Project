import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { Aluno } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';
import { AlunoController } from './aluno.controller';
import { AlunoDTO } from './aluno.dto';
import { alunoResposta } from './alunoResposta.dto';

@Injectable()
export class AlunoService {
    constructor(private prisma: PrismaService){}

    async create(data: AlunoDTO): Promise<Aluno>{
        const media = (data.nota1 + data.nota2) / 2;
        
        const alunoExists = await this.prisma.aluno.findFirst({
            where: {
                id: data.id
            }
        })

        if(alunoExists){
            throw new BadRequestException('Aluno already exists');
        }

        const aluno = await this.prisma.aluno.create({
            data: {
                ...data,
                media
            }
        })

        return aluno;
    }

    async findAll(){
        return this.prisma.aluno.findMany();
    }

    async findOne(id: string){
        return this.prisma.aluno.findMany({
            select: {id: true},
        });
    }

    async update(id: string, data: AlunoDTO){
        const alunoExists = await this.prisma.aluno.findUnique({
            where: {
                id,
            },
        });

        if(!alunoExists){
            throw new Error('Aluno does not exists!')
        }

        return await this.prisma.aluno.update({
            data, 
            where: {
                id,
            },
        })
    }

    async delete(id: string){
        const alunoExists = await this.prisma.aluno.findUnique({
            where: {
                id,
            },
        });

        if(!alunoExists){
            throw new Error('Aluno does not exists!')
        }

        return await this.prisma.aluno.delete({
            where: {
                id,
            },
        });
    }
}
