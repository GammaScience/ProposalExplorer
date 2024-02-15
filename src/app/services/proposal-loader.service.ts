import { Injectable } from '@angular/core';
import { ProposalService } from "../proposal.service";
import { Solution } from "../solution.model";
import { PainPoint } from "../painpoint.model";
import { HttpClient } from '@angular/common/http';
import * as yaml from 'js-yaml';

@Injectable({
  providedIn: 'root'
})

export class ProposalLoaderService {

  constructor(private http: HttpClient) { }
  // Method to load YAML data from a remote url and return a ProposalService
  loadProposalDataFromYAML(yamlPath: string): Promise<ProposalService> {
    return new Promise<ProposalService>((resolve, reject) => {
      this.http.get(yamlPath, { responseType: 'text' }).subscribe(
        (yamlData: string) => {
          const data = yaml.load(yamlData);
          const proposalService = this.buildProposalServiceFromData(data);
          resolve(proposalService);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  // Method to load YAML data from a string and return a ProposalService
  buildProposalDataFromYAMLFile(yamlData: string): ProposalService {
      const data = yaml.load(yamlData);

      return this.buildProposalServiceFromData(data);
  }

  // Build a proposal service from and object
  buildProposalServiceFromData(data):ProposalService{

      const pservice = new ProposalService();
      pservice.title = data.title;
      pservice.description = data.description;

      let painpoints : Set<PainPoint> = new Set();
      let solutions : Set<Solution> = new Set();

      // Loop through the solutions array in the data and add them to the set
      for (const solutionData of data.solutions) {
        const solution = new Solution(
          solutionData.name,
          solutionData.summary,
          solutionData.description,
          new Set(), // blocks will be populated later
          new Set()  // requires will be populated later
        );
        solutions.add(solution);
      }

      // Loop through the painPoints array in the YAML and add them to the set
      for (const painPointData of data.painPoints) {
        const painpoint = new PainPoint(
          painPointData.name,
          painPointData.summery,
          painPointData.description,
          new Set()
        )
        // Add solutions to the pain point if they exist in the solutions array
        if (painPointData.solvedBy && painPointData.solvedBy.length > 0) {
            for(const sol of painPointData.solvedBy){

              let pp_sol = this.findSolutionByName(sol,solutions);

              if(pp_sol !== null)
                painpoint.solvedBy.add(pp_sol);
            }
        }
        painpoints.add(painpoint);
      }
      // Populate the blocks and requires for each solution
      for (const solutionData of data.solutions) {
        const sol = this.findSolutionByName(solutionData.name,solutions);
        if(solutionData.blocks && solutionData.blocks.length > 0)
        {
          for (const blockId of solutionData.blocks) {
            const blockSolution = this.findSolutionByName(blockId,solutions);
            sol.blocks.add(blockSolution);
          }
        }
        if(solutionData.requires && solutionData.requires.length > 0)
        {
          for (const requiresId of solutionData.requires) {
            const requiresSolution = this.findSolutionByName(requiresId,solutions);
            sol.requires.add(requiresSolution);
          }
        }
        sol.updateLinks();

      }
      // check active once all links created
      for (const solutionData of data.solutions) {
        const sol = this.findSolutionByName(solutionData.name,solutions);
        if(solutionData.active && solutionData.active === true)
        {
          sol.setActive(true);
        }
      }


      pservice.solutions = solutions;
      pservice.painPoints = painpoints;
      return pservice;
    }

  // Helper method to find a solution by its Name
  private findSolutionByName(name: string , items:Set<Solution>): Solution | null {

    for (const item of items) {
      if (item.name === name) {
        return item;
      }
    }
    return null;
  }

}
