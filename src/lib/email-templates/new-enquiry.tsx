import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Section,
  Row,
  Column,
} from "@react-email/components";
import type { TemplateEntry } from "./registry";

interface Props {
  name?: string;
  email?: string;
  phone?: string;
  event_type?: string;
  event_date?: string;
  guests?: string;
  city?: string;
  budget?: string;
  notes?: string;
  submittedAt?: string;
}

const main = {
  backgroundColor: "#ffffff",
  fontFamily: "'Inter', Arial, sans-serif",
};

const container = {
  padding: "32px 28px",
  maxWidth: "600px",
};

const heading = {
  fontFamily: "'Cormorant Garamond', Georgia, serif",
  fontSize: "32px",
  fontWeight: 300,
  color: "#081A16",
  margin: "0 0 24px",
};

const label = {
  fontSize: "11px",
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  color: "#B9975B",
  margin: "0 0 4px",
};

const value = {
  fontSize: "15px",
  color: "#1A1A1A",
  margin: "0 0 18px",
  lineHeight: "1.5",
};

const notesBox = {
  backgroundColor: "#F7F3EC",
  padding: "18px",
  borderRadius: "4px",
  marginTop: "8px",
};

const Email = (props: Props) => {
  const {
    name = "—",
    email = "—",
    phone = "—",
    event_type = "—",
    event_date = "—",
    guests = "—",
    city = "—",
    budget = "—",
    notes = "",
    submittedAt = new Date().toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    }),
  } = props;

  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>New enquiry from {name} — {event_type}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>New Consultation Enquiry</Heading>
          <Text style={{ fontSize: "14px", color: "#4A4A4A", marginBottom: "32px" }}>
            A new lead submitted the consultation form on {submittedAt}.
          </Text>

          <Section>
            <Row>
              <Column>
                <Text style={label}>Name</Text>
                <Text style={value}>{name}</Text>
              </Column>
            </Row>
            <Row>
              <Column>
                <Text style={label}>Email</Text>
                <Text style={value}>{email}</Text>
              </Column>
              <Column>
                <Text style={label}>Phone</Text>
                <Text style={value}>{phone}</Text>
              </Column>
            </Row>
            <Row>
              <Column>
                <Text style={label}>Experience</Text>
                <Text style={value}>{event_type}</Text>
              </Column>
              <Column>
                <Text style={label}>Date</Text>
                <Text style={value}>{event_date}</Text>
              </Column>
            </Row>
            <Row>
              <Column>
                <Text style={label}>Guests</Text>
                <Text style={value}>{guests}</Text>
              </Column>
              <Column>
                <Text style={label}>City / Venue</Text>
                <Text style={value}>{city}</Text>
              </Column>
            </Row>
            <Row>
              <Column>
                <Text style={label}>Investment Range</Text>
                <Text style={value}>{budget}</Text>
              </Column>
            </Row>
          </Section>

          {notes ? (
            <Section>
              <Text style={label}>Notes</Text>
              <div style={notesBox}>
                <Text style={{ ...value, margin: 0 }}>{notes}</Text>
              </div>
            </Section>
          ) : null}

          <Text
            style={{
              fontSize: "12px",
              color: "#8A8A8A",
              marginTop: "40px",
              borderTop: "1px solid #E8E4DC",
              paddingTop: "18px",
            }}
          >
            Maison Aurelle — Luxury Event Atelier
            <br />
            Review this enquiry in your admin dashboard.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export const template = {
  component: Email,
  subject: (data: Props) => `New enquiry: ${data.name ?? "Lead"} — ${data.event_type ?? "Event"}`,
  displayName: "New Enquiry Notification",
  previewData: {
    name: "Ananya Roy",
    email: "ananya@example.com",
    phone: "+91 98300 00000",
    event_type: "Luxury Wedding",
    event_date: "2027-02-14",
    guests: "350",
    city: "Udaipur",
    budget: "₹60 Lakh — 1.5 Crore",
    notes: "Looking for a palace venue with a sit-down dinner for family elders.",
  },
} satisfies TemplateEntry;
