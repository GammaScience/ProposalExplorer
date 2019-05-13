import { Injectable } from '@angular/core';
import { PainPoint } from './painpoint.model';
import { Solution } from './solution.model';

/**
 * Container class class for the 'Proposal' being explored.
 */
@Injectable({
  providedIn: 'root'
})
export class ProposalService {
  public title: string;
  public painPoints: Set<PainPoint> = new Set();
  public solutions: Set<Solution> = new Set();

  constructor() { }
}
