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
    `Lorem ipsum dolor sit amet, suas inciderint quo no, no lorem senserit consectetuer
     mel. Facete iisque reprehendunt duo ut, eu solum consetetur has. Saepe numquam
     ponderum in pri, sea eruditi recteque assentior at. Quot vitae appellantur at his,
     ad sit convenire imperdiet gubergren. Error oporteat assentior et eum, nisl brute
     invidunt no vim, eum indoctum vituperatoribus ad. Eam in viderer blandit constituto,
     consul populo sensibus nec id. Harum vocibus no sea, in qui utamur delectus
     constituto.`,
    new Set(),
    new Set());
  const sol2 = new Solution(
    'Solution 2',
    'This is the solution #2',
    `## Solution Two
blar blar blar blar blar blar blar blar blar blar blar blar`,
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
  `
  This is a long discription of the problem and is far to long to show blar.
  ### Lorem ipsum dolor sit amet, his ut lucilius menandri, vix possim facilis ad,
  elitr pertinacia adolescens duo eu. Ut soleat iisque instructior per.
    Aliquip euismod adolescens mea cu, at exerci inimicus argumentum vim, vel
    ut accusam gubergren. Clita officiis vivendum vix ei, vero utamur ius id.

  ### Altera gubergren
  vix et, nostrum philosophia instructior vis in, nec an
    nulla inermis. Sea inani quaerendum et, ius explicari consetetur ei. Ut
    est veniam doming imperdiet, ei eam porro lucilius, ne eam scaevola eloquentiam.
    Quas albucius pro in, sonet vocent epicuri vis an.`,
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
  p.description = `
  # This is a title for the introductory text
  This is an overview of what is wrong with the current system
  Lorem ipsum dolor sit amet id qui nominati repudiare, suavitate dissentiet est cu,
  liber luptatum eu eam. Eum an deleniti oporteat tincidunt. At vis veri ferri
  consequuntur, ne eum soluta sapientem vulputate. Graecis convenire maiestatis ne
  qui, his ea reque tamquam.

  ## Sub heading
  Eam aliquam dissentiet in, qui cu feugait indoctum. Id vidit scripta omnesque
  pro. Ut quo tale singulis, ne mei civibus hendrerit, qui ei elitr eleifend. Mel
  epicurei reformidans ea, id possit doctus nostrum cum, duo cibo perfecto convenire
  an. In consequat suscipiantur nam, eum mucius dolorem efficiendi ut. In odio nihil
  utroque mea, has dico facilisis mnesarchum eu, movet timeam efficiantur ut sed.
  `;
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

