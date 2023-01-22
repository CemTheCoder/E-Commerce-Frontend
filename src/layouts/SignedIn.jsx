import React from 'react'
import { Dropdown, Menu,Image } from 'semantic-ui-react'

export default function SignedIn({signOut}) {
    return (
        <div>
            <Menu.Item>
                <Image avatar spaced="right" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRrh2VXpSzRTn3KcNo3rOd0U8jAkrj2g-Oqw&usqp=CAU"/>
                <Dropdown pointing="top left" text="Cem">
                    <Dropdown.Menu>
                        <Dropdown.Item text="Bilgilerim" icon="info"/>
                        <Dropdown.Item onClick={signOut} text="Çıkış Yap" icon="sign-out"/>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
        </div>
    )
}
