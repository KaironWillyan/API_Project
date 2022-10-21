import { Body, Controller, Post } from '@nestjs/common';
import { AlunoDTO } from './aluno.dto';
import { AlunoService } from './aluno.service';

@Controller('aluno')
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) {}

  @Post()
  async create(@Body() data:AlunoDTO){
    return this.alunoService.create(data);
  }
}
