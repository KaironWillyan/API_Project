import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AlunoDTO } from './aluno.dto';
import { AlunoService } from './aluno.service';

@Controller('aluno')
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) {}

  @Post()
  async create(@Body() data:AlunoDTO){
    return this.alunoService.create(data);
  }

  @Get()
  async findAll(){
    return this.alunoService.findAll();
  }

  @Get(':id')
  async findOne(@Param("id") id:string){
      return this.alunoService.findOne(id);
  }

  @Put(':id')
  async update(@Param("id") id: string, @Body() data: AlunoDTO){
    return this.alunoService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param("id") id: string){
    return this.alunoService.delete(id);
  } 
}