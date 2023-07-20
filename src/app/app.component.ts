import { Component } from '@angular/core';
import { ProposalService } from './proposal.service';
import { ProposalExportService } from './services/proposal-export.service';
import { ProposalLoaderService } from './services/proposal-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  public proposal : ProposalService;
   get title() {
     return this.proposal.title;
   }

   get description() {
    return this.proposal.description;
   }

   constructor(
    public proposal_loader : ProposalLoaderService,
    public proposal_export : ProposalExportService
   ) {

   }

   // load local yaml file.
   onFileSelected(e:any) {
    let file = e.target.files[0];
    if(file){
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const yamlData = e.target.result;
          try {
            this.proposal= this.proposal_loader.buildProposalDataFromYAMLFile(yamlData);
          } catch (error) {
            console.error('Error parsing YAML:', error);
          }
      };
      reader.readAsText(file);
    }
  }
  // export updated proposal to yaml.
  onDownloadClick(e){
    const yamlData = this.proposal_export.toYAML(this.proposal);
    this.downloadYAMLFile(yamlData);
  }

  downloadYAMLFile(yamlData: string): void {
    const blob = new Blob([yamlData], { type: 'text/yaml' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'proposal-choices.yaml';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
}
