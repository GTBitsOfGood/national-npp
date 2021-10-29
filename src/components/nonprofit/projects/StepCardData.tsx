import { Button } from "@chakra-ui/button";
import ApplicationReviewImage from "public/images/nonprofit/project/application_review.svg";
import CancelledImage from "public/images/nonprofit/project/cancelled.svg";
import CompletedImage from "public/images/nonprofit/project/completed.svg";
import InterviewReviewImage from "public/images/nonprofit/project/interview_review.svg";
import MeetingScheduledImage from "public/images/nonprofit/project/meeting_scheduled.svg";
import RejectedImage from "public/images/nonprofit/project/rejected.svg";
import ScheduleMeetingImage from "public/images/nonprofit/project/schedule_meeting.svg";
import SubmitApplicationImage from "public/images/nonprofit/project/submit_application.svg";
import { ProjectStage } from "src/utils/types";

export const getStepCardData = (projectStage: ProjectStage) => {
  switch (projectStage) {
    case ProjectStage.SUBMIT_APPLICATION:
      return {
        actionRequired: true,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,\
            sed do eiusmod tempor incididunt ut labore et dolore magna\
            aliqua. Adipiscing tristique risus nec feugiat in. Morbi enim\
            nunc faucibus a pellentesque sit amet porttitor. Nec ultrices\
            dui sapien eget mi proin sed libero.",
        image: SubmitApplicationImage,
        title: "Submit Application Form",
        buttons: [
          <Button
            onClick={() => console.log("redirecting to form")}
            variant="primary"
            key="first-button"
          >
            Go to Form
          </Button>,
        ],
      };
    case ProjectStage.APPLICATION_REVIEW:
      return {
        actionRequired: false,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
            Nam aliquam sem et tortor consequat id porta nibh venenatis. Vitae \
            elementum curabitur vitae nunc.",
        image: ApplicationReviewImage,
        title: "Application Under Review",
        buttons: [],
      };
    case ProjectStage.SCHEDULE_INTERVIEW:
      return {
        actionRequired: true,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
            Nam aliquam sem et tortor consequat id porta nibh venenatis. Vitae \
            elementum curabitur vitae nunc.",
        image: ScheduleMeetingImage,
        title: "Schedule an Interview",
        buttons: [
          <Button
            onClick={() => console.log("scheduling interview")}
            variant="primary"
            key="first-button"
          >
            Schedule Interview
          </Button>,
        ],
      };
    case ProjectStage.INTERVIEW_SCHEDULED:
      return {
        actionRequired: false,
        text: "Your interview is scheduled for July 27th from 4:30 PM - 5:30 PM EST.",
        image: MeetingScheduledImage,
        title: "Interview Scheduled",
        buttons: [
          <Button
            onClick={() => console.log("rescheduling interview")}
            variant="secondary"
            key="first-button"
          >
            Reschedule Interview
          </Button>,
          <Button
            onClick={() => console.log("cancelling interview")}
            variant="secondary"
            key="second-button"
          >
            Cancel Interview
          </Button>,
        ],
      };
    case ProjectStage.INTERVIEW_REVIEW:
      return {
        actionRequired: false,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
            Nam aliquam sem et tortor consequat id porta nibh venenatis. Vitae \
            elementum curabitur vitae nunc.",
        image: InterviewReviewImage,
        title: "Interview Under Review",
        buttons: [],
      };
    case ProjectStage.SCHEDULE_MEETING:
      return {
        actionRequired: false,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
            Nam aliquam sem et tortor consequat id porta nibh venenatis. Vitae \
            elementum curabitur vitae nunc.",
        image: ScheduleMeetingImage,
        title: "Schedule a Meeting",
        buttons: [
          <Button
            onClick={() => console.log("scheduling meeting")}
            variant="primary"
            key="first-button"
          >
            Schedule Meeting
          </Button>,
        ],
      };
    case ProjectStage.MEETING_SCHEDULED:
      return {
        actionRequired: false,
        text: "Discussing Product Functionalities",
        image: MeetingScheduledImage,
        title: "Meeting Scheduled",
        buttons: [
          <Button
            onClick={() => console.log("rescheduling meeting")}
            variant="secondary"
            key="first-button"
          >
            Reschedule Meeting
          </Button>,
          <Button
            onClick={() => console.log("cancelling meeting")}
            variant="secondary"
            key="second-button"
          >
            Cancel Meeting
          </Button>,
        ],
      };
    case ProjectStage.MAINTENANCE:
    case ProjectStage.COMPLETED:
      return {
        actionRequired: false,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
            Nam aliquam sem et tortor consequat id porta nibh venenatis. Vitae \
            elementum curabitur vitae nunc.",
        image: CompletedImage,
        title: "Project Complete!",
        buttons: [
          <Button
            onClick={() => console.log("returning to home")}
            variant="primary"
            key="first-button"
          >
            Return to Home
          </Button>,
        ],
      };
    case ProjectStage.REJECTED:
      return {
        actionRequired: false,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
            Nam aliquam sem et tortor consequat id porta nibh venenatis. Vitae \
            elementum curabitur vitae nunc.",
        image: RejectedImage,
        title: "Project Rejected",
        buttons: [
          <Button
            onClick={() => console.log("returning to home")}
            variant="primary"
            key="first-button"
          >
            Return to Home
          </Button>,
        ],
      };
    case ProjectStage.CANCELLED:
      return {
        actionRequired: false,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
            Nam aliquam sem et tortor consequat id porta nibh venenatis. Vitae \
            elementum curabitur vitae nunc.",
        image: CancelledImage,
        title: "Project Cancelled",
        buttons: [
          <Button
            onClick={() => console.log("returning to home")}
            variant="primary"
            key="first-button"
          >
            Return to Home
          </Button>,
        ],
      };
    default:
      return {
        actionRequired: true,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,\
            sed do eiusmod tempor incididunt ut labore et dolore magna\
            aliqua. Adipiscing tristique risus nec feugiat in. Morbi enim\
            nunc faucibus a pellentesque sit amet porttitor. Nec ultrices\
            dui sapien eget mi proin sed libero.",
        image: SubmitApplicationImage,
        title: "Submit Application Form",
        buttons: [
          <Button
            onClick={() => console.log("redirecting to form")}
            variant="primary"
            key="first-button"
          >
            Go to Form
          </Button>,
        ],
      };
  }
};
