import { useState } from "react";
import { Button, Card, CardBody, Collapse, Input, Label } from "reactstrap";
import './prof.css';
import { Grid, Paper, Typography } from "@mui/material";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import HomeIcon from '@mui/icons-material/Home';
import axios from "axios";
import { url } from "../../config/config";

const ExamQuestionForm = (args) => {
    const [isOpen, setIsOpen] = useState(false);
    const [questionCnt, setQuesCnt] = useState(0);
    const [questionType, setQuesType] = useState("객관식");

    const [exam, setExam] = useState({
        startDt:'', EndDt:'', sect:'중간고사', type:'객관식', Qnum:0
    })

    // private Integer examNo;
	// private Integer quesNo;
	// private String question;
	// private String answer;
	// private Integer point;
	// private String choice1;
	// private String choice2;
	// private String choice3;
	// private String choice4;

    const [question, setQuestion] = useState({examNo:0,quesNo:0,question:'',choice1:'',choice2:'',choice3:'',choice4:'',answer:''});
    const [questionList, setQuestionList] = useState([]);
    
    const toggle = (question_cnt) => {
        setIsOpen(!isOpen);
    }

    const changeValue = (e) => {
        setExam({...exam, [e.target.name]:e.target.value})
    }

    const changeQstForm = (examCnt)  => {
        let qlist = [];
        for(let i=0; i<examCnt; i++) {
            qlist.push(question);
        }
        setQuestionList([...qlist]);
    }

    const handleInputChange = (index, value) => {
        const updatedList = questionList.map((ques, i) =>
            i === index ? { ...ques, question: value } : ques
        );
        setQuestionList(updatedList);
    };

    const submit = () => {
        const formData = new FormData();
        formData.append("lecNo", "CSCS01");
        formData.append("startDt", exam.startDt);
        formData.append("EndDt", exam.EndDt);
        formData.append("sect", exam.sect);
        formData.append("type", exam.type);
        formData.append("Qnum", exam.Qnum);

        console.log(questionList);
        
        axios.post(`${url}/examWrite`,{exam:exam, questionList:questionList})
            .then(res=>{
                console.log(res)
                if(res.data!=null){
                    const questionFormData = new FormData();
                    

                    
                    axios.post(`${url}/questionWrite`,formData)
                        .then(res1=>{
                            console.log(res1)
                            
                        })
                        .catch(err1=>{
                            console.log(err1)
                        })
                    }
                })
            .catch(err=>{
                console.log(err)
            })
    }

    // const QuestionList = () => {
    //     let questions = [];
    //     if (questionType === '객관식') {
    //         //for (let i = 0; i < questionCnt; i++) {
    //             questionList.map((ques,i)=>(
    //                 <div key={i} className="ExamQuestionForm_For_Div">
    //                     <Label
    //                         // className="ExamQuestionForm_For_Label"
    //                         for={`question-${i}`}>
    //                         {i + 1}번문제
    //                     </Label>
    //                     <Input
    //                         className="ExamQuestionForm_For_Input"
    //                         type="text"
    //                         id={`question-${i}`}
    //                         name={`question-${i}`}
    //                         placeholder={`${i + 1}번 문제를 입력하세요`} />
    //                     <br />
    //                     <Label
    //                         for={`question-${i}`}>
    //                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.
    //                     </Label>
    //                     <Input
    //                         className="ExamQuestionForm_For_Input"
    //                         type="text"
    //                         id={`question-${i}`}
    //                         name={`question-${i}`}
    //                         placeholder={`${i + 1}번 문제를 입력하세요`} />
    //                     <br />
    //                     <Label for={`question-${i}`}>
    //                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.
    //                     </Label>
    //                     <Input
    //                         className="ExamQuestionForm_For_Input"
    //                         type="text"
    //                         id={`question-${i}`}
    //                         name={`question-${i}`}
    //                         placeholder={`${i + 1}번 문제를 입력하세요`} />
    //                     <br />
    //                     <Label for={`question-${i}`}>
    //                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.
    //                     </Label>
    //                     <Input
    //                         className="ExamQuestionForm_For_Input"
    //                         type="text"
    //                         id={`question-${i}`}
    //                         name={`question-${i}`}
    //                         placeholder={`${i + 1}번 문제를 입력하세요`} />
    //                     <br />
    //                     <Label for={`question-${i}`}>
    //                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.
    //                     </Label>
    //                     <Input
    //                         className="ExamQuestionForm_For_Input"
    //                         type="text"
    //                         id={`question-${i}`}
    //                         name={`question-${i}`}
    //                         placeholder={`${i + 1}번 문제를 입력하세요`} />
    //                     <Label for={`question-${i}`}>
    //                         &nbsp;&nbsp;정답
    //                     </Label>
    //                     <Input
    //                         className="ExamQuestionForm_For_Input_Answer"
    //                         type="text"
    //                         id={`question-${i}`}
    //                         name={`question-${i}`}
    //                         placeholder={`${i + 1}번 문제를 입력하세요`} />
    //                 </div>)
    //             );
    //        // }
    //     } else {
    //         for (let i = 0; i < questionCnt; i++) {
    //             questions.push(
    //                 <div key={i} className="ExamQuestionForm_For_Div">
    //                     <Label for={`question-${i}`}>
    //                         {i + 1}번문제
    //                     </Label>
    //                     <Input
    //                         type="text"
    //                         id={`question-${i}`}
    //                         name={`question-${i}`}
    //                         placeholder={`${i + 1}번 문제를 입력하세요`} />
    //                     <Label for={`question-${i}`}>
    //                         정답
    //                     </Label>
    //                     <Input
    //                         type="text"
    //                         id={`question-${i}`}
    //                         name={`question-${i}`}
    //                         placeholder={`${i + 1}번 문제를 입력하세요`} />

    //                 </div>
    //             );

    //         }


    //     }
    //     questions.push(
    //         <Button
    //             className='ExamQuestionForm_Div_Button'
    //             onClick={submit}
    //         >
    //             등록
    //         </Button>
    //     )
    //     return questionList;
    // }

    return (
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom><b>성적조회</b></Typography>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: "auto", overflow: "hidden", width: 1400, margin: "0 auto", borderRadius: 5 }}>
                <Typography ml={5} mt={3} mb={4} variant="h7">
                    <HomeIcon /> 마이페이지 <KeyboardDoubleArrowRightIcon /> 성적 <KeyboardDoubleArrowRightIcon /> <Typography sx={{ display: "inline", color: "#4952A9" }}><b>성적조회</b></Typography>
                </Typography>
                <div className="ExamQuestionForm_Body">
                    <Label

                        className=""
                        for="startDt"
                    >
                        시험 시작일&nbsp;
                    </Label>
                    <Input
                        className="ExamQuestionForm_Input"
                        id="startDt"
                        name="startDt"
                        placeholder=""
                        type="date"
                        onChange={changeValue}
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Label

                        className=""
                        for="EndDt"
                    >
                        &nbsp;마감일&nbsp;
                    </Label>
                    <Input
                        className="ExamQuestionForm_Input"
                        id="EndDt"
                        name="EndDt"
                        placeholder=""
                        type="date"
                        onChange={changeValue}
                    /><br />
                    <Label for="">
                        문제&nbsp;
                    </Label>
                    <Input
                        className="ExamQuestionForm_Input"
                        id="sect"
                        name="sect"
                        type="select"
                        onChange={changeValue}
                    >
                        <option selected>중간고사</option>
                        <option>기말고사</option>
                    </Input>&nbsp;&nbsp;&nbsp;
                    <Input
                        className="ExamQuestionForm_Input"
                        id="type"
                        name="type"
                        type="select"
                        onChange={(e) => {
                            setQuesType(e.target.value);
                            changeValue(e);
                            changeQstForm(exam.Qnum);
                        }} 
                    >
                        <option value="객관식">객관식</option>
                        <option value="주관식">주관식</option>
                    </Input>&nbsp;&nbsp;&nbsp;
                    <Input
                        className="ExamQuestionForm_Input"
                        id="Qnum"
                        name="Qnum"
                        type="text"
                        placeholder="문항수 입력(숫자만)"
                        onChange={(e) => {
                            setQuesCnt(e.target.value);
                            changeValue(e);
                            changeQstForm(e.target.value);
                        }}
                    >
                    </Input>
                    <Button
                        className='ExamQuestionForm_Button'
                        onClick={toggle}
                    >
                        형식만들기
                    </Button>
                    <Collapse
                        isOpen={isOpen} {...args}>
                        <Card className="ExamQuestionForm_Collapse">
                            <CardBody className="ExamQuestionForm_Collapse">
                                {/* {QuestionList()} */}
                                
                                {questionType==='객관식' &&
                                    
                                    questionList.map((ques, i) => (
                                        <div key={i} className="ExamQuestionForm_For_Div">
                                            <Label
                                                // className="ExamQuestionForm_For_Label"
                                                for={`question-${i}`}>
                                                {1 + i}번문제
                                            </Label>
                                            <Input
                                                className="ExamQuestionForm_For_Input"
                                                type="text"
                                                id={`question-${i}`}
                                                name={`question-${i}`}
                                                placeholder={`${i + 1}번 문제를 입력하세요`} 
                                                onChange={(e) => {
                                                    ques.quesNo=i+1;
                                                    handleInputChange(i, e.target.value)
                                                    
                                                }}/>
                                            <br />
                                            <Label
                                                for={`question-${i}`}>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.
                                            </Label>
                                            <Input
                                                className="ExamQuestionForm_For_Input"
                                                type="text"
                                                id={`question-${i}`}
                                                name={`question-${i}`}
                                                placeholder={`${i + 1}번 문제를 입력하세요`} 
                                                onChange={(e)=>{
                                                    ques.choice1 = e.target.value;
                                                }}/>
                                            <br />
                                            <Label for={`question-${i}`}>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.
                                            </Label>
                                            <Input
                                                className="ExamQuestionForm_For_Input"
                                                type="text"
                                                id={`question-${i}`}
                                                name={`question-${i}`}
                                                placeholder={`${i + 1}번 문제를 입력하세요`}
                                                onChange={(e)=>{
                                                    ques.choice2 = e.target.value;
                                                }} />
                                            <br />
                                            <Label for={`question-${i}`}>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.
                                            </Label>
                                            <Input
                                                className="ExamQuestionForm_For_Input"
                                                type="text"
                                                id={`question-${i}`}
                                                name={`question-${i}`}
                                                placeholder={`${i + 1}번 문제를 입력하세요`}
                                                onChange={(e)=>{
                                                    ques.choice3 = e.target.value;
                                                }} />
                                            <br />
                                            <Label for={`question-${i}`}>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.
                                            </Label>
                                            <Input
                                                className="ExamQuestionForm_For_Input"
                                                type="text"
                                                id={`question-${i}`}
                                                name={`question-${i}`}
                                                placeholder={`${i + 1}번 문제를 입력하세요`}
                                                onChange={(e)=>{
                                                    ques.choice4 = e.target.value;
                                                }} />
                                            <Label for={`question-${i}`}>
                                                &nbsp;&nbsp;정답
                                            </Label>
                                            <Input
                                                className="ExamQuestionForm_For_Input_Answer"
                                                type="text"
                                                id={`question-${i}`}
                                                name={`question-${i}`}
                                                placeholder={`${i + 1}번 문제를 입력하세요`}
                                                onChange={(e)=>{
                                                    ques.answer = e.target.value;
                                                }} />
                                        </div>)
                            
                                    )
                                    
                                }
                                {questionType.trim()==='주관식' &&
                                    questionList.map((ques,i)=>(
                                        <div key={i} className="ExamQuestionForm_For_Div">
                                            <Label for={`question-${i}`}>
                                                {i + 1}번문제
                                            </Label>
                                            <Input
                                                type="text"
                                                id={`question-${i}`}
                                                name={`question-${i}`}
                                                placeholder={`${i + 1}번 문제를 입력하세요`}
                                                onChange={(e) => {
                                                    ques.quesNo=i+1;
                                                    handleInputChange(i, e.target.value)
                                                    
                                                }}/>
                                            <Label for={`question-${i}`}>
                                                정답
                                            </Label>
                                            <Input
                                                type="text"
                                                id={`question-${i}`}
                                                name={`question-${i}`}
                                                placeholder={`${i + 1}번 문제를 입력하세요`}
                                                onChange={(e)=>{
                                                    ques.answer = e.target.value;
                                                }} />
                    
                                        </div>)
                                    )
                                }
                                
                            </CardBody>
                            <Button
                className='ExamQuestionForm_Div_Button'
                onClick={submit}
            >
                등록
            </Button>
                        </Card>
                    </Collapse>
                </div>
            </Paper>
        </Grid>
    )
}
export default ExamQuestionForm;