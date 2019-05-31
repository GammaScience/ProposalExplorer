import { ProposalService } from '../app/proposal.service';
import { PainPoint } from '../app/painpoint.model';
import { Solution } from 'src/app/solution.model';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


function getProposal() {
  const p = new ProposalService();
  const sol1 = new Solution(
    'Solution 1',
    'This is the solution #1',
    `blar blar blar blar blar blar blar blar blar blar blar blar`,
    new Set(),
    new Set());
  const sol2 = new Solution(
    'Solution 2',
    'This is the solution #2',
    `blar blar blar blar blar blar blar blar blar blar blar blar`,
    new Set(),
    new Set());
  const sol3 = new Solution(
    'Solution 3',
    'This is the solution #3',
    'blar blar blar blar blar blar blar blar blar blar blar blar',
    new Set(),
    new Set());
  const pp1 = new  PainPoint(
    'Problem 1',
    'This is the problem #1',
    `this is a long discription of the problem and is far to long to show blar
    blar blar blar blar blar blar blar blar blar blar blar blar
    blar blar blar blar blar blar blar blar blar blar blar blar
    blar blar blar blar blar blar blar blar blar blar blar blar
    blar blar blar blar blar blar blar blar blar blar blar blar
    blar blar blar blar blar blar blar blar blar blar blar blar`,
    new Set([sol1]));
  const pp2 = new  PainPoint(
    'Problem 2',
    '',
    'blar blar blar  blar blar blar blar blar blar  blar blar ',
    new Set([sol2])
  );
  const pp3 = new  PainPoint(
    'Problem 3',
    'This is the problem #3',
    'blar blar blar  blar blar blar blar blar blar  blar blar ',
    new Set([sol3])
  );
  p.title = 'Test Proposal';
  p.description = `This is an overview of what is wrong with the current system`;
  sol1.requires.add(sol2);
  sol1.blocks.add(sol3);
  sol1.updateLinks();
  p.solutions.add(sol1);
  p.solutions.add(sol2);
  p.solutions.add(sol3);
  p.painPoints.add(pp1);
  p.painPoints.add(pp2);
  p.painPoints.add(pp3);
  return p;
}

export const environment = {
  production: false,
  proposal: getProposal()
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

