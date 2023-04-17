import React from 'react';
import AdminLayout from "../core/AdminLayout";
import Card from 'react-bootstrap/Card';

const Reviews = () => {
    const styles = {
        border: '2px solid #f2f2f2',
        borderRadius: '5%',   
        padding: '12px',
        boxShadow: '8px 8px 8px #f2f2f2'
    };
  return (
    <div>
        <AdminLayout/>
        <div className="page-wrapper bg-white">
            <div className="container-fluid">
            <div className='font-bold text-dark'><h1>USER REVIEWS:</h1></div>
                
                <div className='row' style={{marginBottom: '15px'}}>
                    
                    <div className="col-md-4">
                    <Card style={styles}>
                        <Card.Body>
                        <Card.Title className='text-dark font-20 font-bold'>Card title</Card.Title>
                        <Card.Subtitle className='text-dark font-16'>Card Subtitle</Card.Subtitle>
                        <Card.Text>
                            This is a longer card with supporting text below as a natural
                            lead-in to additional content. This content is a little bit
                            longer. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                            Aspernatur laudantium id molestias, impedit repellat maxime 
                        </Card.Text>
                        </Card.Body>
                    </Card>
                    </div>

                    <div className="col-md-4">
                    <Card style={styles}>
                        <Card.Body>
                        <Card.Title className='text-dark font-20 font-bold'>Card title</Card.Title>
                        <Card.Subtitle className='text-dark font-16'>Card Subtitle</Card.Subtitle>
                        <Card.Text>
                            This is a longer card with supporting text below as a natural
                            lead-in to additional content. This content is a little bit
                            longer. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                            Aspernatur laudantium id molestias, impedit repellat maxime.
                        </Card.Text>
                        </Card.Body>
                    </Card>
                    </div>

                    <div className="col-md-4">
                    <Card style={styles}>
                        <Card.Body>
                        <Card.Title className='text-dark font-20 font-bold'>Card title</Card.Title>
                        <Card.Subtitle className='text-dark font-16'>Card Subtitle</Card.Subtitle>
                        <Card.Text>
                            This is a longer card with supporting text below as a natural
                            lead-in to additional content. This content is a little bit
                            longer. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                            Aspernatur laudantium id molestias, impedit repellat maxime.
                        </Card.Text>
                        </Card.Body>
                    </Card>
                    </div>
                </div>

                <div className='row' style={{marginBottom: '15px'}}>
                    <div className="col-md-4">
                    <Card style={styles}>
                        <Card.Body>
                        <Card.Title className='text-dark font-20 font-bold'>Card title</Card.Title>
                        <Card.Subtitle className='text-dark font-16'>Card Subtitle</Card.Subtitle>
                        <Card.Text>
                            This is a longer card with supporting text below as a natural
                            lead-in to additional content. This content is a little bit
                            longer. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                            Aspernatur laudantium id molestias, impedit repellat maxime.
                        </Card.Text>
                        </Card.Body>
                    </Card>
                    </div>
                    <div className="col-md-4">
                    <Card style={styles}>
                        <Card.Body>
                        <Card.Title className='text-dark font-20 font-bold'>Card title</Card.Title>
                        <Card.Subtitle className='text-dark font-16'>Card Subtitle</Card.Subtitle>
                        <Card.Text>
                            This is a longer card with supporting text below as a natural
                            lead-in to additional content. This content is a little bit
                            longer. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                            Aspernatur laudantium id molestias, impedit repellat maxime.
                        </Card.Text>
                        </Card.Body>
                    </Card>
                    </div>
                    <div className="col-md-4">
                    <Card style={styles}>
                        <Card.Body>
                        <Card.Title className='text-dark font-20 font-bold'>Card title</Card.Title>
                        <Card.Subtitle className='text-dark font-16'>Card Subtitle</Card.Subtitle>
                        <Card.Text>
                            This is a longer card with supporting text below as a natural
                            lead-in to additional content. This content is a little bit
                            longer. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                            Aspernatur laudantium id molestias, impedit repellat maxime 
                        </Card.Text>
                        </Card.Body>
                    </Card>
                    </div>
                </div>

                <div className='row' style={{marginBottom: '15px'}}>
                    <div className="col-md-4">
                    <Card style={styles}>
                        <Card.Body>
                        <Card.Title className='text-dark font-20 font-bold'>Card title</Card.Title>
                        <Card.Subtitle className='text-dark font-16'>Card Subtitle</Card.Subtitle>
                        <Card.Text>
                            This is a longer card with supporting text below as a natural
                            lead-in to additional content. This content is a little bit
                            longer. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                            Aspernatur laudantium id molestias, impedit repellat maxime
                        </Card.Text>
                        </Card.Body>
                    </Card>
                    </div>
                    <div className="col-md-4">
                    <Card style={styles}>
                        <Card.Body>
                        <Card.Title className='text-dark font-20 font-bold'>Card title</Card.Title>
                        <Card.Subtitle className='text-dark font-16'>Card Subtitle</Card.Subtitle>
                        <Card.Text>
                            This is a longer card with supporting text below as a natural
                            lead-in to additional content. This content is a little bit
                            longer. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                            Aspernatur laudantium id molestias, impedit repellat maxime 
                        </Card.Text>
                        </Card.Body>
                    </Card>
                    </div>
                    <div className="col-md-4">
                    <Card style={styles}>
                        <Card.Body>
                        <Card.Title className='text-dark font-20 font-bold'>Card title</Card.Title>
                        <Card.Subtitle className='text-dark font-16'>Card Subtitle</Card.Subtitle>
                        <Card.Text>
                            This is a longer card with supporting text below as a natural
                            lead-in to additional content. This content is a little bit
                            longer. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                            Aspernatur laudantium id molestias, impedit repellat maxime 
                        </Card.Text>
                        </Card.Body>
                    </Card>
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
};

export default Reviews;