import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import { Editor } from "@tinymce/tinymce-react";
import { Select } from "antd";
import { GET_ALL_PRIORITY_SAGA } from "../../../redux/constants/Cyberbugs/PriorityConstants";
import { GET_ALL_STATUS_SAGA } from "../../../redux/constants/Cyberbugs/StatusConstant";
import {
  CHANGE_ASSIGNESS,
  CHANGE_TASK_MODAL,
  REMOVE_USER_ASSIGN,
  UPDATE_STATUS_TASK_SAGA,
} from "../../../redux/constants/Cyberbugs/TaskConstants";
import { TOKEN_CYBERSOFT } from "../../../util/constants/settingSystem";

import { GET_ALL_TASK_TYPE_SAGA } from "../../../redux/constants/Cyberbugs/TaskTypeConstants";

const { Option } = Select;

const Comment = (props) => {
  const { avatar, commentContent, name, userId, commentId } = props;

  console.log(commentId)

  const [isEditingComment, setIsEditingComment] = useState(false);

  const [editingMsg, setEditingMsg] = useState("");
  const dispatch = useDispatch();

  const submitEditMsgHandler = async () => {
    const editCommentResponse = await fetch(
      `https://jiranew.cybersoft.edu.vn/api/Comment/updateComment?id=${commentId}}&contentComment=${editingMsg}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("ACCESSTOKEN")}`,
          TokenCybersoft: TOKEN_CYBERSOFT,
        },
      }
    );
    if (!editCommentResponse.ok) {
      throw new Error("Editing comment failed...");
    }
    dispatch({ type: GET_ALL_TASK_TYPE_SAGA });
  };

  const deleteCommentHandler = async () => {
    const editCommentResponse = await fetch(
      `https://jiranew.cybersoft.edu.vn/api/Comment/deleteComment?idComment=${commentId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("ACCESSTOKEN")}`,
          TokenCybersoft: TOKEN_CYBERSOFT,
        },
      }
    );
  };

  const renderEditBtn = isEditingComment ? (
    <div className="CommentAction">
      <button className="SaveCommentBtn" onClick={submitEditMsgHandler}>
        Save
      </button>
      <button
        className="CancelCommentBtn"
        onClick={() => {
          setIsEditingComment(false);
        }}
      >
        Cancel
      </button>
    </div>
  ) : null;

  return (
    <div className="lastest-comment">
      <div className="comment-item">
        <div className="display-comment" style={{ display: "flex" }}>
          <div className="avatar">
            <img src={avatar} alt={name} />
          </div>
          <div>
            <p style={{ marginBottom: 5 }}>{name}</p>
            {!isEditingComment && (
              <p style={{ marginBottom: 5 }}>{commentContent}</p>
            )}
            {isEditingComment && (
              <input
                type="text"
                placeholder="Add a comment ..."
                className="CommentInput"
                onChange={(e) => {
                  setEditingMsg(e.target.value);
                }}
              />
            )}
            {renderEditBtn}
            {userId === JSON.parse(localStorage.getItem("USER_LOGIN")).id &&
              !isEditingComment && (
                <div>
                  <span
                    className="CommentBtn"
                    onClick={() => {
                      setIsEditingComment(true);
                    }}
                  >
                    Edit•
                  </span>
                  <span className="CommentBtn" onClick={deleteCommentHandler}>
                    Delete
                  </span>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ModalCyberBugs(props) {
  const { taskDetailModal } = useSelector((state) => state.TaskReducer);
  const { arrStatus } = useSelector((state) => state.StatusReducer);
  const { arrPriority } = useSelector((state) => state.PriorityReducer);
  const { arrTaskType } = useSelector((state) => state.TaskTypeReducer);
  const { projectDetail } = useSelector((state) => state.ProjectReducer);

  const [visibleEditor, setVisibleEditor] = useState(false);
  const [historyContent, setHistoryContent] = useState(
    taskDetailModal.description
  );
  const [content, setContent] = useState(taskDetailModal.description);

  const dispatch = useDispatch();

  const [isPostingComment, setIsPostingComment] = useState(false);
  const [comment, setComment] = useState("");

  console.log(taskDetailModal)

  const insertCommentHandler = async () => {
    if (comment === "") {
      return;
    }
    const insertCommentResponse = await fetch(
      "https://jiranew.cybersoft.edu.vn/api/Comment/insertComment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("ACCESSTOKEN")}`,
          TokenCybersoft: TOKEN_CYBERSOFT,
        },
        body: JSON.stringify({
          taskId: taskDetailModal.taskId,
          contentComment: comment,
        }),
      }
    );
    setIsPostingComment(false);
    if (!insertCommentResponse.ok) {
      throw new Error("Insert comment failed...");
    }
    dispatch({
      type: 'GET_PROJECT_DETAIL',
      projectId: taskDetailModal.projectId,
    });
    console.log(taskDetailModal.lstComment)
  };

  const renderCommentBtn = isPostingComment ? (
    <div className="CommentAction">
      <button className="SaveCommentBtn" onClick={insertCommentHandler}>
        Save
      </button>
      <button
        className="CancelCommentBtn"
        onClick={() => {
          setIsPostingComment(false);
        }}
      >
        Cancel
      </button>
    </div>
  ) : null;

  const postCommentHandler = (e) => {
    setComment(e.target.value);
  };

  useEffect(() => {
    dispatch({ type: GET_ALL_STATUS_SAGA });
    dispatch({ type: GET_ALL_PRIORITY_SAGA });
    dispatch({ type: GET_ALL_TASK_TYPE_SAGA });
  }, []);

  const renderDescription = () => {
    const jsxDescription = ReactHtmlParser(taskDetailModal.description);
    return (
      <div>
        {visibleEditor ? (
          <>
            <Editor
              name="description"
              initialValue={taskDetailModal.description}
              init={{
                selector: "textarea#myTextArea",
                height: 500,
                menubar: false,
                plugins: [
                  "a11ychecker",
                  "advlist",
                  "advcode",
                  "advtable",
                  "autolink",
                  "checklist",
                  "export",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "powerpaste",
                  "fullscreen",
                  "formatpainter",
                  "insertdatetime",
                  "media",
                  "table",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | casechange blocks | bold italic backcolor | " +
                  "alignleft aligncenter alignright alignjustify | " +
                  "bullist numlist checklist outdent indent | removeformat | a11ycheck code table help",
              }}
              onEditorChange={(content, editor) => {
                setContent(content);
              }}
            />
            <button
              className="btn btn-primary m-2"
              onClick={() => {
                dispatch({
                  type: CHANGE_TASK_MODAL,
                  name: "description",
                  value: content,
                });
                setVisibleEditor(false);
              }}
            >
              Save
            </button>
            <button
              className="btn btn-primary m-2"
              onClick={() => {
                dispatch({
                  type: CHANGE_TASK_MODAL,
                  name: "description",
                  value: historyContent,
                });
                setVisibleEditor(false);
              }}
            >
              Close
            </button>
          </>
        ) : (
          <div
            onClick={() => {
              setHistoryContent(taskDetailModal.description);
              setVisibleEditor(!visibleEditor);
            }}
          >
            {jsxDescription}
          </div>
        )}
      </div>
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: CHANGE_TASK_MODAL,
      name,
      value,
    });
  };

  const renderTimeTracking = () => {
    const { timeTrackingSpent, timeTrackingRemaining } = taskDetailModal;

    const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
    const percent = Math.round((Number(timeTrackingSpent) / max) * 100);

    return (
      <div>
        <div style={{ display: "flex" }}>
          <i className="fa fa-clock" />
          <div style={{ width: "100%" }}>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${percent}%` }}
                aria-valuenow={Number(timeTrackingSpent)}
                aria-valuemin={Number(timeTrackingRemaining)}
                aria-valuemax={max}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p className="logged">{Number(timeTrackingRemaining)}h logged</p>
              <p className="estimate-time">
                {Number(timeTrackingRemaining)}h remaining
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <input
              className="form-control"
              name="timeTrackingSpent"
              onChange={handleChange}
            />
          </div>
          <div className="col-6">
            <input
              className="form-control"
              name="timeTrackingRemaining"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="modal fade"
      id="infoModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="infoModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-info">
        <div className="modal-content">
          <div className="modal-header">
            <div className="task-title">
              <i className="fa fa-bookmark" />
              <select
                name="typeId"
                value={taskDetailModal.typeId}
                onChange={handleChange}
                style={{ marginLeft: 10 }}
              >
                {arrTaskType.map((tp, index) => (
                  <option value={tp.id}>{tp.taskType}</option>
                ))}
              </select>
              <span>{taskDetailModal.taskName}</span>
            </div>
            <div style={{ display: "flex" }} className="task-click">
              <div>
                <i className="fab fa-telegram-plane" />
                <span style={{ paddingRight: 20 }}>Give feedback</span>
              </div>
              <div>
                <i className="fa fa-link" />
                <span style={{ paddingRight: 20 }}>Copy link</span>
              </div>
              <i
                className="fa fa-trash-alt='xyz'"
                style={{ cursor: "pointer" }}
              />
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
          </div>
          <div className="modal-body">
            <div className="container-fluid">
              <div className="row">
                <div className="col-8">
                  <p className="issue">This is an issue of type: Task.</p>
                  <div className="description">
                    <p>Description</p>
                    {renderDescription()}
                  </div>
                  <div className="comment">
                    <h6>Comment</h6>
                    <div className="block-comment" style={{ display: "flex" }}>
                      <div className="avatar">
                        <img
                          src={
                            JSON.parse(localStorage.getItem("USER_LOGIN"))
                              .avatar
                          }
                          alt="xyz"
                        />
                      </div>
                      <div className="input-comment">
                        <input
                          type="text"
                          placeholder="Add a comment ..."
                          className="CommentInput"
                          onChange={postCommentHandler}
                          onFocus={() => {
                            setIsPostingComment(true);
                          }}
                        />
                        {renderCommentBtn}
                        <p>
                          <span style={{ fontWeight: 500, color: "gray" }}>
                            Protip:
                          </span>
                          <span>
                            press
                            <span
                              style={{
                                fontWeight: "bold",
                                background: "#ecedf0",
                                color: "#b4bac6",
                              }}
                            >
                              M
                            </span>
                            to comment
                          </span>
                        </p>
                      </div>
                    </div>
                    {taskDetailModal.lstComment?.map((comment) => (
                      <Comment
                        avatar={comment.avatar}
                        commentContent={comment.commentContent}
                        name={comment.name}
                        userId={comment.idUser}
                        commentId={comment.id}
                      />
                    ))}
                  </div>
                </div>
                <div className="col-4">
                  <div className="status">
                    <h6>STATUS</h6>
                    <select
                      name="statusId"
                      className="custom-select"
                      value={taskDetailModal.statusId}
                      onChange={(e) => {
                        handleChange(e);

                        // const action = {
                        //   type: UPDATE_STATUS_TASK_SAGA,
                        //   taskUpdateStatus: {
                        //     taskId: taskDetailModal.taskId,
                        //     statusId: e.target.value,
                        //     projectId: taskDetailModal.projectId,
                        //   },
                        // };

                        // console.log('action',action);
                        // console.log("taskupdatestatus", {
                        //   taskId: taskDetailModal.taskId,
                        //   statusId: e.target.value,
                        // });

                        // dispatch(action);
                      }}
                    >
                      {arrStatus.map((status, index) => (
                        <option value={status.statusId} key={index}>
                          {status.statusName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="assignees" style={{ marginBottom: 10 }}>
                    <h6>ASSIGNEES</h6>
                    <div className="row">
                      {taskDetailModal.assigness.map((user, index) => (
                        <div className="col-6  mt-2 mb-2">
                          <div
                            key={index}
                            style={{ display: "flex", width: "fit-content" }}
                            className="item"
                          >
                            <div className="avatar">
                              <img src={user.avatar} alt={user.avatar} />
                            </div>
                            <p className="name mt-1 ml-1">
                              {user.name}
                              <i
                                className="fa fa-times"
                                style={{ marginLeft: 5, cursor: "pointer" }}
                                onClick={() => {
                                  dispatch({
                                    type: REMOVE_USER_ASSIGN,
                                    userId: user.id,
                                  });
                                }}
                              />
                            </p>
                          </div>
                        </div>
                      ))}

                      <div className="col-6  mt-2 mb-2">
                        <Select
                          options={projectDetail.members
                            ?.filter((mem) => {
                              const index =
                                taskDetailModal.assigness?.findIndex(
                                  (us) => us.id === mem.userId
                                );
                              if (index !== -1) {
                                return false;
                              }
                              return true;
                            })
                            .map((mem, index) => ({
                              value: mem.userId,
                              label: mem.name,
                            }))}
                          optionFilterProp="label"
                          style={{ width: "100%" }}
                          name="lstUser"
                          value="+ Add more"
                          className="form-control"
                          onSelect={(value) => {
                            if (value == "0") {
                              return;
                            }
                            let userSelected = projectDetail.members.find(
                              (mem) => mem.userId == value
                            );
                            userSelected = {
                              ...userSelected,
                              id: userSelected.userId,
                            };
                            // dispatchReducer
                            dispatch({
                              type: CHANGE_ASSIGNESS,
                              userSelected,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div className="reporter">
                                        <h6>REPORTER</h6>
                                        <div style={{ display: 'flex' }} className="item">
                                            <div className="avatar">
                                                <img src={require("../../../assets/img/download (1).jfif")} alt='xyz' />
                                            </div>
                                            <p className="name">
                                                Pickle Rick
                    <i className="fa fa-times" style={{ marginLeft: 5 }} />
                                            </p>
                                        </div>
                                    </div> */}
                  <div className="priority" style={{ marginBottom: 15 }}>
                    <h6>PRIORITY</h6>
                    <select
                      name="priorityId"
                      className="form-control"
                      value={taskDetailModal.priorityId}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    >
                      {arrPriority.map((item, index) => (
                        <option key={index} value={item.priorityId}>
                          {item.priority}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="estimate">
                    <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                    <input
                      name="originalEstimate"
                      type="text"
                      className="estimate-hours"
                      value={taskDetailModal.originalEstimate}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                  <div className="time-tracking">
                    <h6>TIME TRACKING</h6>
                    {renderTimeTracking()}
                  </div>
                  <div style={{ color: "#929398" }}>Create at a month ago</div>
                  <div style={{ color: "#929398" }}>
                    Update at a few seconds ago
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
