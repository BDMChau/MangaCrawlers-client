import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';

import { Col, Row, Tabs, Typography } from 'antd'


const { TabPane } = Tabs

export default function Contact() {
    let location = useLocation()
    let history = useHistory()
    const [tabSelected, setTabSelected] = useState("");

    useEffect(() => {
        const paths = location.pathname.split("/");
        const tabKey = paths[1] === "legal" ? paths[2] : paths[1]


        setTabSelected(tabKey);
    }, [location])

    const renderContact = () => (
        <div>
            <Typography.Title level={3}>Contact us</Typography.Title>

            <div>
                For advertising & cooperation, please send email to us:
                <a href="mailto:mangacrawlers123@gmail.com"> mangacrawlers123@gmail.com</a>
            </div>

            <div>
                For reporting or more infomation, you can send email or  <a href="#">contact an administrator</a> directly
            </div>
        </div>
    )

    const renderTerms = () => (
        <div>
            <Typography.Title level={3}>Terms of Service</Typography.Title>

            <div>
                <Typography.Title level={5}>1. Comments and Forums</Typography.Title>
                <div>
                    Disagreements can and will happen. However, we ask all users avoid the following:
                    <p>
                        <b>1.1</b> Racism: With the exception of a serious historical discussion, there is never a context in which racist language is acceptable on MangaDex. This extends to profile biographies, user names, group banners, and user avatars.
                    </p>

                    <p>
                        <b>1.2</b> Sexism: One gender is not inherently superior to another. Harassing someone solely on the basis of gender is not acceptable on MangaDex. This extends to profile biographies, user names, group banners, and user avatars.
                    </p>

                    <p>
                        <b>1.3</b> Religious Discrimination: All members of all religions are equally deserving of respect. Insulting someone solely on the basis of their religion or slandering a specific religion is not acceptable on MangaDex. This extends to profile biographies, usernames, group banners, and user avatars.
                        Other Terminology: This category includes everything else that does not neatly fit under the above categories. It includes, but is not limited to, rape jokes, homophobia, transphobia, and direct personal attacks.
                    </p>

                    <p>
                        <b>1.4</b> Direct Personal Attacks: We encourage intelligent, thoughtful discussion on MangaDex. We encourage users to criticize the content of a post and not the poster themselves. This particular violation will be taken on a case by case basis since context and severity of the violation is important when a mod is considering taking action. For example, calling someone an idiot and offering evidence why they're an idiot will most likely not result in moderator action. Calling someone an idiot and doing nothing else will result in moderator action, not because you called someone an idiot, but because it was the sole content of your post. Note that especially egregious foul language may or may not result in moderator action.
                    </p>

                    <p>
                        <b>1.5</b> If you must disagree with someone, we prefer that you take your arguments into a private conversation so as not to derail a thread. If you cannot argue amicably, consider using the Block function, which can be found on every user's profile page. Blocking someone prevents you from seeing all of their messages on MangaDex.
                    </p>
                </div>

                <Typography.Title level={5}>2. Comic Entries</Typography.Title>
                <div>
                    <p>
                        <b>2.1</b> Only title English. Exceptions can be made, but contact staff or admin beforehand.
                    </p>

                    <p>
                        <b>2.2</b> Oneshots that were published in an anthology should be included in the respective anthology entry and should not have their own entries.
                    </p>

                    <p>
                        <b>2.3</b> A self-published comic with multiple chapters that has been serialized should have its own separate entry. If the serialized comic uses the same title, the pre-serialized entry should have "(Webcomic)" or the equivalent appended to the title.
                    </p>

                    <p>
                        <b>2.4</b>
                        The previous rule aside, If there are multiple entries with the same title, do not add anything to distinguish them. Use the actual title as it is.
                        Do not add duplicate entries. Search for multiple alternate titles before adding a series.
                    </p>

                </div>

                <Typography.Title level={5}>3. Identification & Reporting</Typography.Title>
                <div>
                    <p>
                        If you wish to inquire, modify or delete my personal account or another account, contact us and we will confirm is the principal first and then respond.
                    </p>
                </div>
            </div>
        </div>
    )

    const renderpolicy = () => (
        <div>
            <Typography.Title level={3}>Privacy Policy</Typography.Title>

            <div>
                <p>
                    Welcome to use MangaClawers. The Platform is provided by MangaClawers HK Limited, and we promise to respect and protect your privacy.
                </p>

                <p>
                    This Privacy Policy will list all personal information that we collect, process or are provided by you. Before accessing or using our website, service and application, you must ensure that you have read and fully understand this Privacy Policy to your personal information and how we will collect, use and process your personal information.
                </p>

                <p>
                    Please do not use our services if you do not agree with any content of this Privacy Policy.
                </p>
            </div>
        </div>
    )


    return (
        <Row justify="center">
            <Col md={20} xxl={20} sm={24} xs={24}>
                <Tabs
                    style={{ marginTop: "70px" }}
                    activeKey={tabSelected}
                    tabPosition={"left"}
                    className="contact-tabs"
                    onChange={(val) => val === "contact_us" ? history.push(`/${val}`) : history.push(`/legal/${val}`)}
                >
                    <TabPane tab="Contact us" key="contact_us">
                        {renderContact()}
                    </TabPane>

                    <TabPane tab="Privacy Policy" key="privacy_policy">
                        {renderpolicy()}
                    </TabPane>

                    <TabPane tab="Terms of Service" key="terms_of_policy">
                        {renderTerms()}
                    </TabPane>
                </Tabs>
            </Col>
        </Row>
    )
}
