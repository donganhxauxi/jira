import React from 'react';
import { Route } from 'react-router-dom';
import classes from './Projects.module.scss';
import IssuesActionBar from '../../components/issues-action-bar/IssuesActionBar';
import ProjectNavbar from '../../components/project-navbar/ProjectNavbar';
import KanbanBoard from '../../components/kanban-board/KanbanBoard';

function Projects() {
  return (
    <div className={classes.Projects}>
      <IssuesActionBar />
      <ProjectNavbar />

      <Route path="/project/board">
        <KanbanBoard />
      </Route>
      <Route path="/project/settings">
        <p>Settings</p>
      </Route>

    </div>
  );
}

export default Projects;
