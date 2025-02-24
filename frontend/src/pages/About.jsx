import { Github, Linkedin, Mail } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-vh-100 bg-light">
      <div className="container py-5">
        {/* About Section */}
        <section className="mb-5 text-center">
          <h1 className="mb-4 display-5 fw-bold">About FinanceAI</h1>
          <div className="mx-auto col-md-8">
            <p className="mb-3 fs-5 text-secondary">
              FinanceAI is a cutting-edge financial management platform that combines the power of artificial 
              intelligence with intuitive design to help you make better financial decisions.
            </p>
            <p className="fs-5 text-secondary">
              Our mission is to make financial management accessible to everyone, regardless of their financial 
              knowledge or background.
            </p>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-5 text-center">
          <h2 className="mb-4 display-6 fw-bold">Meet the Team</h2>
          <div className="row g-4 justify-content-center">
            {[1, 2, 3].map((member) => (
              <div key={member} className="col-12 col-sm-6 col-lg-4">
                <div className="text-center">
                  <div className="mx-auto mb-3 rounded-circle overflow-hidden" style={{ width: "128px", height: "128px" }}>
                    <img 
                      alt={`Team Member ${member}`} 
                      className="img-fluid" 
                      src={`/placeholder.svg?height=128&width=128`} 
                    />
                  </div>
                  <h3 className="mb-1 h5">John Doe</h3>
                  <p className="text-secondary">Software Engineer</p>
                  <div className="d-flex justify-content-center gap-2">
                    <button className="btn btn-outline-secondary btn-sm">
                      <Github size={20} />
                    </button>
                    <button className="btn btn-outline-secondary btn-sm">
                      <Linkedin size={20} />
                    </button>
                    <button className="btn btn-outline-secondary btn-sm">
                      <Mail size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="text-center">
          <h2 className="mb-4 display-6 fw-bold">Get in Touch</h2>
          <div className="mx-auto col-md-6 p-4 border rounded bg-white shadow-sm">
            <form className="row g-3">
              <div className="col-12">
                <label htmlFor="name" className="form-label fw-medium">Name</label>
                <input type="text" className="form-control" id="name" placeholder="Your name" />
              </div>
              <div className="col-12">
                <label htmlFor="email" className="form-label fw-medium">Email</label>
                <input type="email" className="form-control" id="email" placeholder="your@email.com" />
              </div>
              <div className="col-12">
                <label htmlFor="message" className="form-label fw-medium">Message</label>
                <textarea className="form-control" id="message" rows={4} placeholder="Your message"></textarea>
              </div>
              <div className="col-12">
                <button className="btn btn-primary w-100">Send Message</button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
