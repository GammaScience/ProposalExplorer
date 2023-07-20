import { ProposalService } from "../proposal.service";
import * as yaml from 'js-yaml';
import { Solution } from "../solution.model";
import { PainPoint } from "../painpoint.model";

export class ProposalExportService {

  toYAML(proposal:ProposalService): string {
    const data = {
      title: proposal.title,
      description: proposal.description,
      solutions: this.extractSolutions(proposal.solutions),
      painPoints: this.extractPainpoints(proposal.painPoints)
    };

    return yaml.dump(data);
  }

  extractSolutions(solutions:Set<Solution>) : any[]{
    let s = [];
    solutions.forEach(item => {
      s.push({
        name: item.name,
        summary: item.summary,
        description: item.description,
        blocks: this.toArrayOfNames(item.blocks),
        requires: this.toArrayOfNames(item.requires),
        active: true
      } );
    })
    return s;
  }

  extractPainpoints(points:Set<PainPoint>) : any[]{
    let s = [];
    points.forEach(item => {
      s.push({
        name: item.name,
        summary: item.summary,
        description: item.description,
        solvedBy: this.toArrayOfNames(item.solvedBy),
      } );
    })
    return s;
  }

  toArrayOfNames(items:Set<Solution | PainPoint>) : Array<string>{
    let s = new Array();
    items.forEach(item => {
      s.push(item.name);
    });
    return s;
  }
}
