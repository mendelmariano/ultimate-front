import { Club } from "../membership/club.model";

export class Result {
  id?: number;
  casa_id?: number;
  gols_casa?: number;
  penaltis_casa?: number;
  fora_id?: number;
  gols_fora?: number;
  penaltis_fora?: number;
  status?: number;
  usuario_casa?: Club;
  usuario_fora?: Club;
  name?: string;

  
}

export class ResultFormatado{
  id?: number;
  timeA?: string;
  timeB?: string;
  golsTimeA?: number;
  golsTimeB?: number;
  status?: string;
}
