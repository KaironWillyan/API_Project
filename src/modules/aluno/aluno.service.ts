import { Injectable } from '@nestjs/common';
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

    async findAll(){
        return this.prisma.aluno.findMany();
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
