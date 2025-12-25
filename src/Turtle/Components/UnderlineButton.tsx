import {Button} from "antd"

interface UnderlineButtonProps {
    lang: string;
    onClick: () => void;
}

export default function UnderlineButton({
                                            lang,
                                            onClick
                                        }: UnderlineButtonProps) {
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
                type="text"
                size="small"
                onClick={onClick}
                style={{
                    fontSize: '12px',
                    color: '#8c8c8c',
                    textDecoration: 'underline',
                    padding: '0 4px',
                    height: 'auto',
                    lineHeight: 'normal'
                }}
            >
                {lang}
            </Button>
        </div>
    );
}