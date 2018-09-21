import { Injectable, OnInit } from '@angular/core';
import { Subject ,  BehaviorSubject ,  Observable } from 'rxjs';

import { WorkflowStageApi } from '../sdk/services/custom/WorkflowStage';
import { WorkflowStatusApi } from '../sdk/services/custom/WorkflowStatus';
import { WorkflowTransitionApi } from '../sdk/services/custom/WorkflowTransition';

@Injectable()
export class WorkflowService {
    // used to show current stage selected without refreshing page
    private wizard = new Subject<number>();
    wizard$ = this.wizard.asObservable();

    // used to display transition button without refreshing page on change stage
    private transtionButton = new Subject<any>();
    transtionButton$ = this.transtionButton.asObservable();

    constructor(
        private _workflowStageApi: WorkflowStageApi,
        private _workflowStatusApi: WorkflowStatusApi,
        private _workflowTransitionApi: WorkflowTransitionApi
    ) {
    }

    getJobStageIndex(workflowId: number, workflowStatusId: number) {
        this._workflowStageApi
            .fetchWorkflowStage({workflowId: workflowId})
            .subscribe(
                workflowStages => {
                    this._workflowStageApi
                        .workflowCurrentStage(workflowStatusId)
                        .subscribe(stageId => {
                            for (let i = 0, len = workflowStages.length; i < len; i++) {
                                if (workflowStages[i]['id'] === stageId) {
                                    this.wizard.next(workflowStages[i]['id']);
                                }
                            }
                        });
                },
                error => {
                    console.log(error);
                });
    }

    getStageIndex(data: Array<any>, workflowStatusId: number) {
        this._workflowStageApi
            .workflowCurrentStage(workflowStatusId)
            .subscribe(stageId => {
                for (let i = 0, len = data.length; i < len; i++) {
                    if (data[i]['id'] === stageId) {
                        this.wizard.next(data[i]['id']);
                    }
                }
            });
    }

    /**
     * @param workflowStatusId
     */
    getTransitionButtons(workflowStatusId: number) {
        this._workflowTransitionApi
            .transitionStage({workflowStatusId: workflowStatusId})
            .subscribe(
                data => {
                    this.transtionButton.next(data);
                },
                error => {
                    console.log(error);
                });
    }

    /**
     *
     * @param workflowId
     * return all workflowsatge of current workflowId
     */
    getWorkflowSatge(workflowId) {
        return this._workflowStageApi
            .fetchWorkflowStage({workflowId: workflowId})
            .map(workflowStages => workflowStages);
    }

    /**
     *
     * @param sfdcId
     * @param modelName
     */
    getWorkflowStatusId(sfdcId, modelName) {
        return this._workflowStatusApi
            .workflowStatusId(
                {
                    where: {sfdcId: sfdcId},
                    fields: {workflowId: true, workflowStatusId: true}
                },
                modelName
            ).map(data => data);
    }

    /**
     *
     *
     */
    getChangedWorkflowStageStatus(transitionId, modelId, modelName) {
        return this._workflowTransitionApi
            .changeWorkflowStageStatus(
                {
                    workflowTransitionId: transitionId,
                    sfdcId: modelId
                },
                modelName
            ).map(data => data);
    }
}
